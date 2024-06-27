from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Administrator').exists()


class IsSeller(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Shites').exists()
