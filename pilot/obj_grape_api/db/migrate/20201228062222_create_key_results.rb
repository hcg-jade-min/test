class CreateKeyResults < ActiveRecord::Migration[5.2]
  def change
    create_table :key_results do |t|
      t.string :kr_name
      t.text :kr_description
      t.string :kr_manage_style, default: '달성률', null: false
      t.integer 'kr_status', default: 0, null: false
      t.integer :kr_achievement, default: 0
      t.references :objective, foreign_key: true

      t.timestamps
    end
  end
end
