from .db import db, environment, SCHEMA, add_prefix_for_prod

class CompletedGame(db.Model):
    __tablename__ = 'completedGames'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    challengerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    word = db.Column(db.String(5), nullable=False)
    attempts = db.Column(db.Integer, nullable=False)
    win = db.Column(db.Boolean, nullable=False)
    pointsAwarded = db.Column(db.Integer, nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'challengerId': self.challengerId,
            'word': self.word,
            'attempts': self.attempts,
            'win': self.win,
            'pointsAwarded': self.pointsAwarded
        }
