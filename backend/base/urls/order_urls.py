from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('', views.getOrders, name='myorders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),

    path('<int:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),
    path('<int:pk>/', views.getOrderById, name='user-order'),
]
