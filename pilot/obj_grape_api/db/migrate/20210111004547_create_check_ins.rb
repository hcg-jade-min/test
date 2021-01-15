class CreateCheckIns < ActiveRecord::Migration[5.2]
  def change
    create_table :check_ins do |t|
      t.integer 'ci_status', default: 0, null: false
      t.integer :ci_value
      t.references :key_result, foreign_key: true

      t.timestamps
    end
  end
end
