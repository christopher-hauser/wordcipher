from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Challenge

def word_length(form, field):
    word = field.data
    if len(word) != 5:
        raise ValidationError('Word must be exactly 5 characters.')

class EditChallengeForm(FlaskForm):
    word = StringField('Word', validators=[DataRequired(), word_length])
    submit = SubmitField('Send')
