# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_11_004547) do

  create_table "check_ins", force: :cascade do |t|
    t.integer "ci_status", default: 0, null: false
    t.integer "ci_value"
    t.integer "key_result_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["key_result_id"], name: "index_check_ins_on_key_result_id"
  end

  create_table "key_results", force: :cascade do |t|
    t.string "kr_name"
    t.text "kr_description"
    t.string "kr_manage_style", default: "달성률", null: false
    t.integer "kr_status", default: 0, null: false
    t.integer "kr_achievement", default: 0
    t.integer "objective_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["objective_id"], name: "index_key_results_on_objective_id"
  end

  create_table "obj_joins", force: :cascade do |t|
    t.integer "role", null: false
    t.integer "objective_id"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["objective_id"], name: "index_obj_joins_on_objective_id"
    t.index ["user_id"], name: "index_obj_joins_on_user_id"
  end

  create_table "objectives", force: :cascade do |t|
    t.string "objective_name"
    t.text "objective_description"
    t.date "started_on"
    t.date "ended_on"
    t.integer "objective_status", default: 0, null: false
    t.integer "objective_achievement", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
