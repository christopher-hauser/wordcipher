from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, List, Word
from app.forms.new_list_form import NewListForm
from app.forms.edit_list_form import EditListForm
from app.forms.new_word_form import NewWordForm

list_routes = Blueprint('lists', __name__)


# GET ALL LISTS
@list_routes.route('/')
@login_required
def get_all_lists():
    lists = List.query.order_by(List.name).all()
    return {'lists': [a_list.to_dict() for a_list in lists]}

# GET ONE LIST
@list_routes.route('/<int:id>')
@login_required
def get_one_lists(id):
    a_list = List.query.get(id)
    return a_list.to_dict()

# CREATE NEW LIST
@list_routes.route('/', methods=["POST"])
@login_required
def create_new_list():
    data = request.get_json()
    form = NewListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_list = List(
            userId=data['userId'],
            name=form.data['name']
        )
        db.session.add(new_list)
        db.session.commit()
        return new_list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

# EDIT LIST
@list_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_a_list(id):
    form = EditListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        edited_list = List.query.get(id)
        edited_list.name = form.data['name']
        db.session.commit()
        return edited_list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


# DELETE LIST
@list_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_list(id):
    a_list = List.query.get(id)
    db.session.delete(a_list)
    db.session.commit()
    return "List deleted."

# ADD WORD TO LIST
@list_routes.route('/<int:id>/add-word', methods=['POST'])
@login_required
def add_word_to_list(id):
    data = request.get_json()
    form = NewWordForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        word = Word(
            userId=data['userId'],
            listId = data['listId'],
            word=form.data['word'],
        )
        db.session.add(word)
        db.session.commit()
        return word.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


# REMOVE WORD FROM LIST
@list_routes.route('/delete-word/<int:id>', methods=['DELETE'])
@login_required
def delete_word_from_list(id):
    word = Word.query.get(id)
    db.session.delete(word)
    db.session.commit()
    return "Word deleted."
