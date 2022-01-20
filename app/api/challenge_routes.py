from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Challenge
from app.forms.edit_challenge_form import EditChallengeForm
from app.forms.new_challenge_form import NewChallengeForm


challenge_routes = Blueprint('challenges', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

# GET CHALLENGES I'VE RECEIVED
@challenge_routes.route('/<int:id>')
@login_required
def get_my_challenges(id):
    challenges = Challenge.query.filter_by(recipientId=id).all()
    return {'challenges': [challenge.to_dict() for challenge in challenges]}


# GET CHALLENGES I'VE SENT
@challenge_routes.route('/<int:id>/my-challenges')
@login_required
def get_challenges_ive_sent(id):
    challenges = Challenge.query.filter_by(challengerId=id).all()
    return {'challenges': [challenge.to_dict() for challenge in challenges]}

# CREATE NEW CHALLENGE
@challenge_routes.route('/', methods=['POST'])
@login_required
def send_challenge():
    data = request.get_json()
    form = NewChallengeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    user = User.query.get(data['challengerId'])
    friend_requests = user.received_friends.all()
    my_friend_requests = user.friended.all()
    friends = [friend.id for friend in friend_requests if friend in my_friend_requests]

    form.recipientId.choices = friends

    if form.validate_on_submit():
        challenge = Challenge(
            challengerId=data['challengerId'],
            recipientId=form.data['recipientId'],
            word=form.data['word'],
            status='Incomplete'
        )
        db.session.add(challenge)
        db.session.commit()
        return challenge.to_dict()
    print('ERRORS', form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}

# EDIT EXISTING CHALLENGE
@challenge_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_challenge(id):
    form = EditChallengeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if validate_on_submit():
        challenge = Challenge.query.get(id)
        challenge.word = form.data['word']
        db.session.commit()
        return {'challenge': challenge.to_dict()}
    return form.errors


# REMOVE EXISTING CHALLENGE
@challenge_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def remove_challenge(id):
    challenge = Challenge.query.get(id)
    db.session.delete(challenge)
    db.session.commit()
    return "Challenge deleted."
