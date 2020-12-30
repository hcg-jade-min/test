class CreateObjJoins < ActiveRecord::Migration[5.2]
  def change
    create_table :obj_joins do |t|

      t.timestamps
    end
  end
end
