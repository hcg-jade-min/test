class CreateCheckIns < ActiveRecord::Migration[5.2]
  def change
    create_table :check_ins do |t|
      t.string :ci_status
      t.integer :ci_value

      t.timestamps
    end
  end
end
