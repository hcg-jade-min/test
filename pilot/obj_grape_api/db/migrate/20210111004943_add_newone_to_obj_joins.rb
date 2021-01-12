class AddNewoneToObjJoins < ActiveRecord::Migration[5.2]
  def change
    add_column :obj_joins, :role, :string
  end
end
