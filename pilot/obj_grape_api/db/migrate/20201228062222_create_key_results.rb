class CreateKeyResults < ActiveRecord::Migration[5.2]
  def change
    create_table :key_results do |t|
      t.string :name
      t.text :description
      t.integer :manage_style
      t.integer :achievement
      t.references :objective, foreign_key: true

      t.timestamps
    end
  end
end
