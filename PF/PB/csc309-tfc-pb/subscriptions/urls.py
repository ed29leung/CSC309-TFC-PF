from django.urls import path
from subscriptions.views import (
        SubscribeView,
        UpdateSubscriptionView,
        # CancelSubscriptionView,
        ListSubscriptionView,
        SubscriptionStatusView
        )

app_name = 'subscriptions'

urlpatterns = [
        path('subscribe/', SubscribeView.as_view()),
        path('update/', UpdateSubscriptionView.as_view()),
        # path('cancel/', CancelSubscriptionView.as_view()),
        path('list/', ListSubscriptionView.as_view()),
        path('status/', SubscriptionStatusView.as_view()),
]

