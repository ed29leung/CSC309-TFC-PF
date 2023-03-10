from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils import timezone
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
import django_filters.rest_framework
from django.db.models import Prefetch
from subscriptions.models import CurrentSubscription, SubscriptionPlan

from classes.models import Class, ClassTimeTable, EnrollClass
from classes.serializers import ClassSerializer, ClassTimeTableSerializer, EnrollClassSerializer

from accounts.models import Account
import datetime

class ListUpcomingClassView(generics.ListAPIView):
    """
    List upcoming classes in a given studio.
    """
    serializer_class = ClassTimeTableSerializer
    search_fields = ['classid__name', 'classid__coach', 'duration', 'timefrom', 'timeto']
    # filterset_fields = search_fields

    def get_queryset(self):
        result = ClassTimeTable.objects.filter(time__gte=timezone.now()).\
            filter(spotleft__gt=0).\
            filter(classid__in=Class.objects.filter(studio=self.kwargs['studio_id'])).\
            filter(classid__name__contains=self.request.query_params.get('classid__name', '')).\
            filter(classid__coach__contains=self.request.query_params.get('classid__coach', '')).\
            order_by('time')
        if self.request.query_params.get('timefrom', ''):
            result = result.filter(time__gte=self.request.query_params.get('timefrom', ''))
        if self.request.query_params.get('timeto', ''):
            result = result.filter(time__lte=self.request.query_params.get('timeto', ''))
        if self.request.query_params.get('duration', ''):
            if self.request.query_params.get('duration', '').isdigit():
                timedelta = datetime.timedelta(hours=int(self.request.query_params.get('duration', '')))
                result = result.filter(classid__duration__lte=timedelta)
        return result
        


class ListMyClassView(generics.ListAPIView):
    """
    Allows a user to view their upcoming enrolled classes in chronological order.
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = EnrollClassSerializer

    def get_queryset(self):
        # As a user, I want to see my class schedule and history in chronological order
        return EnrollClass.objects.filter(account=self.request.user).\
            filter(classtime__classid__in=Class.objects.filter(studio=self.kwargs['studio_id'])).\
            order_by('classtime__time')


classtime = openapi.Parameter('timeid', openapi.IN_QUERY, description="Class time", type=openapi.TYPE_STRING)
op = openapi.Parameter('op', openapi.IN_QUERY, description="Operation: either enroll or drop", type=openapi.TYPE_STRING)
class ModifyClassView(APIView):
    """
    Allows a user to enrol or drop a class. You need to login to use this action.
    """
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(manual_parameters=[classtime, op], operation_description="Enroll or drop a class")
    def post(self, request):
        try:
            user = Account.objects.get(id=request.user.id)
        except Account.DoesNotExist:
            return Response({'error': 'User not found'}, status=400)
        classtime = request.data.get('timeid')
        op = request.data.get('op')

        if not classtime or not op:
            return Response({'error': 'Missing class or time'}, status=400)

        if op not in ['enroll', 'drop']:
            return Response({'error': 'op must be either enroll or drop'}, status=400)

        if not CurrentSubscription.objects.filter(account=request.user).exists():
            return Response({'error': 'You need to subscribe to gym first!'}, status=400)

        if EnrollClass.check_enroll(user, classtime) and op == 'enroll':
            return Response({'error': 'Already enrolled'}, status=400)
        elif not EnrollClass.check_enroll(user, classtime) and op == 'drop':
            return Response({'error': 'Not enrolled'}, status=400)

        classtime_ = get_object_or_404(ClassTimeTable, id=classtime)
        if classtime_.check_full() and op == 'enroll':
            return Response({'error': 'Class is full'}, status=400)

        if op == 'enroll':
            enroll_class = EnrollClass()
            enroll_class.enroll(user, classtime_)
            return Response({'success': 'Enrolled'}, status=200)
        elif op == 'drop':
            enroll_class = EnrollClass.objects.get(account=user, classtime=classtime_)
            if not enroll_class:
                return Response({'error': 'Not enrolled'}, status=400)
            
            enroll_class.drop()
            return Response({'success': 'Dropped'}, status=200)
