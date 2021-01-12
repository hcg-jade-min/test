class CreateObjectives < ActiveRecord::Migration[5.2]
  def change
    create_table :objectives do |t|
      t.string :objective_name
      t.text :objective_description
      t.date :started_on
      t.date :ended_on
      t.string :objective_status, default: 'default'
      t.integer :objective_achievement, default: 0

      t.timestamps
    end
  end
end
