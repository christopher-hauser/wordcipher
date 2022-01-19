from .db import db

class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(55))

    users = db.relationship('User', back_populates='lists')
    words = db.relationship('Word', back_populates='lists', cascade="all,delete")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'name': self.name
        }
