require "rails_helper"

RSpec.feature "Detail sale progression", :js do
  given!(:sale) { create(:sale, stage: :follow_up, product: "Sale to detail") }

  background do
    visit "/"
  end

  scenario "Opens the modal and closes it" do
    follow_up_column  = page.find("#column-follow_up")
    closed_column     = page.find("#column-closed")

    card = page.find("#card-#{sale.id}")
    card.drag_to(closed_column)
    
    # Trying access modal before click on a card
    expect(page).to have_no_selector('#modal-progression', visible: true)

    card.click

    # Validating sale details and stages presene on modal
    modal = page.find("#modal-progression")
    within modal do
      expect(page).to have_content "Sale to detail"
    end

    # Trying access a closed modal
    click_button "Fechar Detalhes"
    expect(page).to have_no_selector('#modal-progression', visible: true)
  end
end
