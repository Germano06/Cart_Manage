from django.urls import path
from .views import addCart, createProduct, createUser, delCart, getAdmin, getCart, getProduct, getProducts, getUser, getUsers


urlpatterns = [
    path('get-admin/<str:em>', getAdmin, name='getAdmin'),
    path('get-users/', getUsers, name='getUsers'),
    path('get-user/<str:em>', getUser, name='getUser'),
    path('get-products/', getProducts, name='getProducts'),
    path('get-product/<str:pk>', getProduct, name='getProduct'),
    path('get-cart/<str:em>', getCart, name='getCart'),
    path('create-user/', createUser, name='createUser'),
    path('create-product/', createProduct, name='createProduct'),
    path('add-cart/', addCart, name='addCart'),
    path('delete-cart/<str:pk>', delCart, name='delCard')
]
