from .db import db

class Word(db.Model):
    __tablename__ = 'words'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    listId = db.Column(db.Integer, db.ForeignKey("lists.id"), nullable=False)
    word = db.Column(db.String(5), nullable=False)

    users = db.relationship("User", back_populates="words")
    lists = db.relationship("List", back_populates="words")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'listId': self.listId,
            'word': self.word
        }
