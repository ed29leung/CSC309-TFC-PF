from django.urls import path
from payments.views import (
        CreatePaymentInfoView,
        PaymentInfoUpdateView,
        ListPaymentHistory,
        PaymentUpcomingView,
        PaymentInfoView,
        )

app_name = 'payments'

urlpatterns = [
        path('add/', CreatePaymentInfoView.as_view()),
        path('update/', PaymentInfoUpdateView.as_view()),
        path('history/', ListPaymentHistory.as_view()),
        path('upcoming/', PaymentUpcomingView.as_view()),
        path('view/', PaymentInfoView.as_view()),
]

