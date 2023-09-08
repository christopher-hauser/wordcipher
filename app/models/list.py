from .db import db, environment, SCHEMA, add_prefix_for_prod

class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(55))

    users = db.relationship('User', back_populates='lists')
    words = db.relationship('Word', back_populates='lists', cascade="all,delete")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'name': self.name,
            'words': [word.to_dict() for word in self.words],
            'username': self.users.username
        }
