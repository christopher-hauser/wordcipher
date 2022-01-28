from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Challenge, CompletedGame

completed_games_routes = Blueprint('completed_games', __name__)

# SEND COMPLETED GAME DATA
@completed_games_routes.route('/', methods=["POST"])
@login_required
def send_game_data():
    data = request.get_json()

    completed_game = CompletedGame(
        userId=data['userId'],
        challengerId=data['challengerId'],
        word=data['word'],
        attempts=data['attempts'],
        win=data['win'],
        pointsAwarded=data['pointsAwarded']
    )

    challengerId = data['challengerId']
    word = data['word']
    win = data['win']
    if challengerId:
        this_challenge = Challenge.query.filter_by(challengerId=challengerId, word=word, status='Incomplete').first()
        print(this_challenge)
        if win == True:
            this_challenge.status = 'Completed'
        if win == False:
            this_challenge.status = 'Failed'

    db.session.add(completed_game)
    db.session.commit()
    return completed_game.to_dict()
