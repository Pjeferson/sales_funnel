require "rails_helper"

RSpec.feature "Detail sale progression", :js do
  given!(:sale) { 
    create(:sale, stage: :contact, product: "Sale to detail")
  }

  background do
    visit "/"
  end

  scenario "Opens the modal and closes it" do
    proposal  = page.find("#column-proposal")
    follow_up = page.find("#column-follow_up")
    closing   = page.find("#column-closing")
    closed    = page.find("#column-closed")

    # Passing the card through all the stages
    card = page.find("#card-#{sale.id}")
    card.drag_to(proposal) 
    card.drag_to(follow_up) 
    card.drag_to(closing)
    card.drag_to(closed)
    
    
    # Trying access modal before click on a card
    expect(page).to have_no_selector('#modal-progression', visible: true)

    card.click

    # Validating sale details and stages presene on modal
    modal = page.find("#modal-progression")
    within modal do
      expect(page).to have_content "Sale to detail"
      # Contact stage isn't created automatically on this test
      expect(page).to have_content "Envio de proposta"
      expect(page).to have_content "Follow-up"
      expect(page).to have_content "Fechamento"
      expect(page).to have_content "Ganho"
      expect(page).to have_no_content "Perdido"
    end

    # Trying access a closed modal
    click_button "Fechar Detalhes"
    expect(page).to have_no_selector('#modal-progression', visible: true)
  end
end
