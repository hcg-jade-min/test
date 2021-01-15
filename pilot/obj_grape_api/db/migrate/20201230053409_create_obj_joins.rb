class CreateObjJoins < ActiveRecord::Migration[5.2]
  def change
    create_table :obj_joins do |t|
      t.integer 'role', null: false
      t.references :objective, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
