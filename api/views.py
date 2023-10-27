from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import AdminSerializer, CartSerializer, ProductsSerializer, UserSerializer
from .models import Admin, Cart, Products, User

# Create your views here.


@api_view(['GET'])
def getAdmin(request, em):
    try:
        admin = Admin.objects.get(email=em)
        serializer = AdminSerializer(admin, many=False)
    except:
        return Response("NULL")
    return Response(serializer.data)


@api_view(['GET'])
def getUsers(request):
    users = User.objects.all().order_by('-id')
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getUser(request, em):
    try:
        users = User.objects.get(email=em)
        serializer = UserSerializer(users, many=False)
    except:
        return Response("NULL")
    return Response(serializer.data)


@api_view(['GET'])
def getProducts(request):
    prods = Products.objects.filter(active=True)
    serializer = ProductsSerializer(prods, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    prods = Products.objects.get(id=pk)
    serializer = ProductsSerializer(prods, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getCart(request, em):
    crt = Cart.objects.filter(uemail=em)
    serializer = CartSerializer(crt, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createUser(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def createProduct(request):
    serializer = ProductsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def addCart(request):
    serializer = CartSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def delCart(request, pk):
    crt = Cart.objects.filter(prod=pk)
    crt.delete()
    return Response("Checkout Successful!")
