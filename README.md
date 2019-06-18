# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


## User テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index:true|
|email|string|null: false, index:true|


### Association
- has many : messeage
- has many : group 

## Group テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|       |

### Association
- has many : message
- belongs_to : user

## message テーブル
|Column|Type|Options|
|------|----|-------|
|message|text|       |
|image|text|       |
|date|datetime|       |
|user_id|integer|foreign_key: true|
|guroup_id|integer|foreign_key: true|

### Association
- belongs_to : group
- belongs_to : user

## group_user テーブル
Column|Type|Options|
|------|----|-------|
|group|references ||
|user|references ||

### Association
- belongs_to :group
- belongs_to :user
