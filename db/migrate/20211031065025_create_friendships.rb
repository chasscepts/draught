class CreateFriendships < ActiveRecord::Migration[6.0]
  def change
    create_table :friendships do |t|
      t.boolean :confirmed, null: false, default: false
      t.references :initiator, foreign_key: { to_table: :users }
      t.references :invitee, foreign_key: { to_table: :users }
      
      t.timestamps
    end
  end
end
