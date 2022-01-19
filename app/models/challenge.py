from .db import db

class Challenge(db.Model):
    __tablename__ = 'challenges'

    id = db.Column(db.Integer, primary_key=True)
    challengerId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    recipientId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    word = db.Column(db.String(5), nullable=False)
    status = db.Column(db.String(55), nullable=False)

    def to_dict(self):

        return {
            'id': self.id,
            'challengerId': self.challengerId,
            'recipientId': self.recipientId,
            'word': self.word,
            'status': self.status
        }
