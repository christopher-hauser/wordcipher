from .db import db, environment, SCHEMA, add_prefix_for_prod

class Word(db.Model):
    __tablename__ = 'words'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

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
