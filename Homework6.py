# from and import statements in order to access specific functions with these libraries
import os

from flask import Flask, request, jsonify, make_response
# Initializes the app variable to be connected to Flask
# This file will then connect to the React.js frontend component via the parsed url for the API
app = Flask(__name__, static_folder='./build', static_url_path='/static')
# app = Flask(__name__)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/checkIn', methods=['Get', 'Post'])
def checkIn_hardware(projectId="Project 1", qty=0):
    combination = {
        "projectId": projectId,
        "qty": qty
    }
    new_combination = make_response(jsonify(combination))
    return new_combination


app.add_url_rule('/', 'checkIn', checkIn_hardware)


@app.route('/checkOut', methods=['Get', 'Post'])
def checkOut_hardware(projectId="Project 1", qty=0):
    combination = {
        "projectId": projectId,
        "qty": qty
    }
    new_combination = make_response(jsonify(combination))
    return new_combination


app.add_url_rule('/', 'checkOut', checkOut_hardware)


@app.route('/join', methods=['Get', 'Post'])
def joinProject(projectId="Project 1"):
    combination = {
        "projectId": projectId
    }
    new_combination = make_response(jsonify(combination))
    return new_combination


app.add_url_rule('/', 'join', joinProject)


@app.route('/leave', methods=['Get', 'Post'])
def leaveProject(projectId="Project 1"):
    combination = {
        "projectId": projectId
    }
    new_combination = make_response(jsonify(combination))
    return new_combination


app.add_url_rule('/', 'leave', leaveProject)


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
# if __name__ == '__main__':
#     app.run()

