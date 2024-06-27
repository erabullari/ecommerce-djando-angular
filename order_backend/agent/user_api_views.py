from django.contrib.auth.models import User, Group
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from agent.user_serializers import UserReadSerializer, UserWriteSerializer


class UserListCreateAPIView(ListCreateAPIView):
    permission_classes = [AllowAny]

    queryset = User.objects.all()
    serializer_class = UserReadSerializer

    def get_queryset(self, admin_group=None):
        shites_group = Group.objects.get(name='Shites')
        shites_users = User.objects.filter(groups=shites_group)
        return shites_users

    def list(self, request):
        queryset = self.get_queryset()
        serializer = UserReadSerializer(queryset, many=True)
        return Response(serializer.data)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserReadSerializer
        return UserWriteSerializer


class UserRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]

    serializer_class = UserReadSerializer

    # we use it twice bc admin detail should be private
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserReadSerializer
        return UserWriteSerializer

    def get_queryset(self, admin_group=None):
        shites_group = Group.objects.get(name='Shites')
        shites_users = User.objects.filter(groups=shites_group)
        return shites_users

    def list(self, request):
        queryset = self.get_queryset()
        serializer = UserReadSerializer(queryset, many=True)
        return Response(serializer.data)


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'is_superuser': user.is_superuser,
            'groups': [group.name for group in user.groups.all()]
        })

