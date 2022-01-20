from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Challenge

class EditChallengeForm(FlaskForm):
    word = StringField('Word', validators=[DataRequired()])
    submit = SubmitField('Send')
