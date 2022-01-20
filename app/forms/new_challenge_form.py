from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Challenge

def word_length(form, field):
    word = field.data
    if len(word) != 5:
        raise ValidationError('Word must be exactly 5 characters.')

class NewChallengeForm(FlaskForm):
    recipientId = SelectField('recipientId', coerce=int, validators=[DataRequired()])
    word = StringField('word', validators=[DataRequired(), word_length])
    submit = SubmitField('Submit')
