"""
Flask Documentation:     https://flask.palletsprojects.com/
Jinja2 Documentation:    https://jinja.palletsprojects.com/
Werkzeug Documentation:  https://werkzeug.palletsprojects.com/
This file creates your application.
"""

# from crypt import methods
import site 

from app import app, Config,  mongo, Mqtt
from flask import escape, render_template, request, jsonify, send_file, redirect, make_response, send_from_directory 
from json import dumps, loads 
from werkzeug.utils import secure_filename
from datetime import datetime,timedelta, timezone
from os import getcwd
from os.path import join, exists
from time import time, ctime
from math import floor
 



#####################################
#   Routing for your application    #
#####################################

@app.route('/api/hello', methods=['GET']) 
def get_query():   
    '''Returns data '''    
    if request.method == "GET":
        try:             
            return jsonify({"status":"found","data": "Hello World! again"})
            
        except Exception as e:
            print(f"get_query error: f{str(e)}")        
    return jsonify({"status":"failed","data":[]})
   

   
@app.route('/api/number', methods=['GET']) 
def get_query1():   
    '''Returns data '''    
    if request.method == "GET":
        try:          
            now = floor(time())  
            return jsonify({"status":"found","data": now})
            
        except Exception as e:
            print(f"get_query error: f{str(e)}")        
    return jsonify({"status":"failed","data":[]})
 

# ROUTE THAT RETURNS THE MULTIPLICATION OF TWO NUMBERS
@app.route('/api/mul/<number1>/<number2>/<number3>', methods=['GET']) 
def get_query2(number1, number2, number3):   
    '''Returns data '''    
    if request.method == "GET":
        try:          
            num1 = int(number1)
            num2 = int(number2)
            num3 = int(number3)
            mul = num1 * num2 * num3
            print( type(num1))
            print(num2)
            return jsonify({"status":"found","data": mul})
            
        except Exception as e:
            print(f"get_query error: f{str(e)}")        
    return jsonify({"status":"failed","data":[]})


@app.route('/api/data/<start>/<end>', methods=['GET']) 
def get_data(start,end):   
    '''Returns data '''    
    if request.method == "GET":
        try:          
            num1 = int(start)
            num2 = int(end) 
            data = mongo.query(num1,num2)
            if data:
                return jsonify({"status":"found","data": data})
            
        except Exception as e:
            print(f"get_data error: f{str(e)}")        
    return jsonify({"status":"failed","data":[]})



@app.route('/api/reservesum', methods=['GET']) 
def get_data_sum():   
    '''Returns data '''    
    if request.method == "GET":
        try:   
            data = mongo.querySum()
            if data:
                return jsonify({"status":"found","data": data})
            
        except Exception as e:
            print(f"get_data error: f{str(e)}")        
    return jsonify({"status":"failed","data":[]})

###############################################################
#                    TUTORIALS ON THURSDAY                    #
###############################################################



@app.route('/api/mul/form', methods=['POST']) # POST REQUEST WITH FORM DATA
def get_data_post():   
    '''Returns data '''    
    if request.method == "POST":
        try:  
            # EXTRACT FORM DATA
            form = request.form   

            num1 = int(form.get('num1'))
            num2 = int(form.get('num2')) 

            print(f"Digit 1 : {num1}  Digit 2 : {num2}")
            mul = num1 * num2

            # data = mongo.query(num1,num2)
            # if data:
            return jsonify({"status":"complete","data": mul})
            
        except Exception as e:
            print(f"get_data error: f{str(e)}")        
    return jsonify({"status":"failed","data":[]})



@app.route('/api/div/json', methods=['POST']) # POST REQUEST WITH JSON DATA
def get_data_json_post():   
    '''Returns data '''    
    if request.method == "POST":
        try:  
            # EXTRACT FORM DATA
            numbers = request.get_json()
            print("Numbers ",numbers)    
            num1 = int(numbers["num1"])
            num2 = int(numbers["num2"])

            print(f"Digit 1 : {num1}  Digit 2 : {num2}")

            div = num1 / num2

            # data = mongo.query(num1,num2)
            # if data:
            return jsonify({"status":"complete","data": div})
            
        except Exception as e:
            print(f"get_data error: f{str(e)}")        
    return jsonify({"status":"failed","data":[]})







# START 1706798204  END 1706798219

###############################################################
# The functions below should be applicable to all Flask apps. #
###############################################################


@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)

@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response

@app.errorhandler(405)
def page_not_found(error):
    """Custom 404 page."""    
    return jsonify({"status": 404}), 404



