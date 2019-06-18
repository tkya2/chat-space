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
## Users テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index:true|
|email|string|null: false, index:true|

### Association
- has_many : group_users
- has_many : messeages
- has_many : groups , through: :members

## Groups テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many : group_users
- has_many : messages
- has_many : users, through: :members

## messages テーブル
|Column|Type|Options|
|------|----|-------|
|message|text|       |
|image|text|       |
|date|datetime|       |
|user_id|references|null: false, foreign_key: true|
|guroup_id|references|null: false, foreign_key: true|

### Association
- belongs_to : group
- belongs_to : user

## group_users テーブル
Column|Type|Options|
|------|----|-------|
|group_id|references|null: false, index: true, foreign_key: true|
|user_id|references|null: false, index: true, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user
