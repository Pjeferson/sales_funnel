class Sale < ApplicationRecord
  enum stage: [:contact, :proposal, :follow_up, :closing, :closed, :lost]

  has_many :progressions,-> { order(:created_at => :desc) }

  validates :product, :customer, :amount, :stage, presence: true
  validates_with SaleValidator

  def self.create_with_progression(args)
    create(args).tap do |sale|
      sale.create_progression if sale.persisted?
    end
  end

  def self.stage_position(stage)
    stages[stage] || -1
  end

  def ahead_of_stage?(other_stage)
    Sale.stage_position(stage) > Sale.stage_position(other_stage)
  end

  def progress_to(stage)
    update(stage: stage) && create_progression
  end

  def create_progression
    progressions.create(stage: stage)
  end
end
