require 'rubygems'
require 'sinatra'
require 'json'
require 'erb'
require File.expand_path('../../lib/bundler', __FILE__)

def json!
  content_type 'application/json'
end

get '/' do
  erb :index
end

get '/json-search.js' do
  content_type 'application/x-javascript'
  Bundler.bundled
end

get '/tests/:name' do
  content_type 'application/x-javascript'
  File.read("tests/#{params[:name]}")
end

get '/hi' do
  "Hello World!"
end