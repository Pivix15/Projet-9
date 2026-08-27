import { fireEvent, render, screen } from "@testing-library/react";
import { DataProvider, api } from "../../contexts/DataContext";
import eventsData from "../../../public/events.json";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(eventsData)
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    /* Test d'un événement présent dans la liste */
    await screen.findByText("User&product MixUsers")
  })
  it("a list a people is displayed", () => {
    render(<Home />)
    /* Test de personnes dans la list */
    expect(screen.getByText("Alice")).toBeInTheDocument()
    expect(screen.getByText('Luís')).toBeInTheDocument()
  })
  it("a footer is displayed", () => {
    render(<Home />)
    /* Test d'un éléments présent dans le footer */
    expect(screen.getByText("45 avenue de la République, 75000 Paris")).toBeInTheDocument()
  })
  it("an event card, with the last event, is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(eventsData)
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    )
    /* Calcule le même "last" */
     /* ... pour copier tous les éléments du tableau */
    const lastEvent = [...eventsData.events].sort((a, b) =>
      new Date(a.date) < new Date(b.date) ? 1 : -1
    )[0]

    await screen.findAllByText(lastEvent.title)
  })
});
