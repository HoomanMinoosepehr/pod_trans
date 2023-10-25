class CreateDocuments < ActiveRecord::Migration[7.0]
  def change
    create_table :documents do |t|
      t.text :name
      t.text :description
      t.text :text
      t.text :summarize
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
