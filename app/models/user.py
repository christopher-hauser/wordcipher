from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Friend(db.Model):
    __tablename__ = 'friends'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True),
    friender_id = db.Column("friender_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    friendee_id = db.Column("friendee_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    bio = db.Column(db.String(500))
    hashed_password = db.Column(db.String(255), nullable=False)

    challengers = db.relationship('Challenge', backref='users_challenger', lazy='dynamic', foreign_keys = 'Challenge.challengerId')
    challengees = db.relationship('Challenge', backref='users_challengee', lazy='dynamic', foreign_keys = 'Challenge.recipientId')
    lists = db.relationship('List', back_populates='users', cascade="all,delete")
    words = db.relationship('Word', back_populates='users', cascade="all,delete")
    completedGames = db.relationship('CompletedGame', backref='completed_challengee', foreign_keys = 'CompletedGame.userId', cascade="all,delete")
    completed_challenger = db.relationship('CompletedGame', backref='completed_challenger', foreign_keys='CompletedGame.challengerId')

    received_friends = db.relationship(
    "User",
    secondary=Friend,
    primaryjoin=(Friend.friender_id == id),
    secondaryjoin=(Friend.friendee_id == id),
    backref=db.backref("friended", lazy="dynamic"),
    lazy="dynamic"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'friended_me': [user.id for user in self.received_friends if user not in self.friended],
            'friended_them': [user.id for user in self.friended if user not in self.received_friends],
            'friends': [user.id for user in self.received_friends if user in self.friended],
            'points': sum([game.pointsAwarded for game in self.completedGames]),
            'games_won': sum([game.win for game in self.completedGames if game.win]),
            'games_played': len([game for game in self.completedGames])
        }
