from django.urls import path
from .views import createCart, createProduct, createUser, delCart, gallery, getAdmin, getCart, getProduct, getProducts, getUser, getUsers


urlpatterns = [
    path('gal/', gallery, name="gallery"),
    path('get-admin/<str:em>', getAdmin, name='getAdmin'),
    path('get-users/', getUsers, name='getUsers'),
    path('get-user/<str:em>', getUser, name='getUser'),
    path('get-products/', getProducts, name='getProducts'),
    path('get-product/<str:pk>', getProduct, name='getProduct'),
    path('get-cart/<str:em>', getCart, name='getCart'),
    path('create-user/', createUser, name='createUser'),
    path('create-product/', createProduct, name='createProduct'),
    path('create-cart/', createCart, name='createCart'),
    path('delete-cart/<str:pk>', delCart, name='delCard')
]
