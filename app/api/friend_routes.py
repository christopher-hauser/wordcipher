from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User

friend_routes = Blueprint('friends', __name__)


#GET FRIENDS
@friend_routes.route('/<int:id>')
@login_required
def get_friends(id):
    user = User.query.get(id)
    friend_requests = user.received_friends.all()
    my_friend_requests = user.friended.all()

    return {'friends': [friend.to_dict() for friend in friend_requests if friend in my_friend_requests]}

#GET FRIEND REQUESTS
@friend_routes.route('/<int:id>/friend-requests')
@login_required
def get_friend_requests(id):
    user = User.query.get(id)
    friend_requests = user.received_friends.all()
    return {'requests': [request.to_dict() for request in friend_requests]}

#GET SENT FRIEND REQUESTS
@friend_routes.route('/<int:id>/my-friend-requests')
@login_required
def get_my_friend_requests(id):
    user = User.query.get(id)
    my_friend_requests = user.friended.all()
    return {'requests': [request.to_dict() for request in my_friend_requests]}

#SEND FRIEND REQUEST
@friend_routes.route('/<int:id>/new-friend-request', methods=["POST"])
@login_required
def send_friend_request(id):
    data = request.get_json()
    friendee_id = id
    friender_id = data["frienderId"]
    new_friend = User.query.get(friendee_id)
    user = User.query.get(friender_id)
    user.friended.append(new_friend)
    db.session.commit()
    return new_friend.to_dict()

# UNDO FRIEND REQUEST
@friend_routes.route('/<int:id>/undo-friend-request', methods=["POST"])
@login_required
def undo_friend_request(id):
    data = request.get_json()
    friendee_id = id
    friender_id = data["frienderId"]
    new_friend = User.query.get(friendee_id)
    user = User.query.get(friender_id)
    user.friended.remove(new_friend)
    db.session.commit()
    return new_friend.to_dict()

#ACCEPT FRIEND REQUEST
@friend_routes.route('/<int:id>/accept-friend-request', methods=["POST"])
@login_required
def accept_friend_request(id):
    data = request.get_json()
    friendee_id = id
    friender_id = data["frienderId"]
    new_friend = User.query.get(friendee_id)
    user = User.query.get(friender_id)

    user.received_friends.append(new_friend)
    db.session.commit()
    return new_friend.to_dict()


#DECLINE FRIEND REQUEST
@friend_routes.route('/<int:id>/decline-friend-request', methods=["POST"])
@login_required
def decline_friend_request(id):
    data = request.get_json()
    friendee_id = id
    friender_id = data["frienderId"]
    user = User.query.get(friendee_id)
    attempted_friender = User.query.get(friender_id)

    attempted_friender.friended.remove(user)
    db.session.commit()
    return attempted_friender.to_dict()


# UNFRIEND SOMEONE

@friend_routes.route('/<int:id>/remove-friend', methods=["POST"])
@login_required
def remove_friend(id):
    data = request.get_json()
    friend_to_remove_id = id
    user_id = data["frienderId"]
    user = User.query.get(user_id)
    friend = User.query.get(friend_to_remove_id)

    user.friended.remove(friend)
    user.received_friends.remove(friend)
    friend.friended.remove(user)
    friend.received_friends.remove(user)

    db.session.commit()
    return friend.to_dict()
