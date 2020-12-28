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

ActiveRecord::Schema.define(version: 2020_12_28_062222) do

  create_table "key_results", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "manage_style"
    t.integer "achievement"
    t.integer "objective_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["objective_id"], name: "index_key_results_on_objective_id"
  end

  create_table "objectives", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.date "started_on"
    t.date "ended_on"
    t.integer "status"
    t.integer "achievement"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
