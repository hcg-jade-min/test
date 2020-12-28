class CreateObjectives < ActiveRecord::Migration[5.2]
  def change
    create_table :objectives do |t|
      t.string :name
      t.text :description
      t.date :started_on
      t.date :ended_on
      t.integer :status
      t.integer :achievement

      t.timestamps
    end
  end
end
