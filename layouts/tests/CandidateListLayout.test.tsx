import { ReactElement } from "react";
import { RecoilRoot } from "recoil";
import { render, fireEvent, screen } from "@testing-library/react";
import { mockCandidateData } from "../../mock_data";
import { parseCandidate } from "../../types/utils";
import { Candidate } from "../../types/CandidateType";
import CandidateListLayout from "../CandidateListLayout";

describe("Canddiate Card Component", () => {
  const fetchMock = jest.fn();

  afterEach(() => {
    sessionStorage.clear();
    jest.resetAllMocks();
  });

  function getWrapper(mockCandidate: Candidate): ReactElement {
    return (
      <RecoilRoot>
        <CandidateListLayout
          candidate={mockCandidate}
          fetchNewCandidate={fetchMock}
        />
      </RecoilRoot>
    );
  }

  it("renders", async () => {
    const mockCandidate = parseCandidate(mockCandidateData.results[0]);
    render(getWrapper(mockCandidate));

    const card = await screen.findByTestId("new-candidate");
    expect(card).not.toBeNull();
  });

  it("adds to history list on accept", async () => {
    const mockCandidate = parseCandidate(mockCandidateData.results[0]);
    render(getWrapper(mockCandidate));
    const acceptButton = await screen.findByTestId("accept-button");
    fireEvent.click(acceptButton);
    const historyCard = await screen.findByTestId("old-candidate");
    expect(historyCard).not.toBeNull();
  });

  it("adds to history list on reject", async () => {
    const mockCandidate = parseCandidate(mockCandidateData.results[0]);
    render(getWrapper(mockCandidate));
    const rejectButton = await screen.findByTestId("reject-button");
    fireEvent.click(rejectButton);
    const historyCard = await screen.findByTestId("old-candidate");
    expect(historyCard).not.toBeNull();
  });

  it("can undo decision", async () => {
    const mockCandidate = parseCandidate(mockCandidateData.results[0]);
    render(getWrapper(mockCandidate));
    const rejectButton = await screen.findByTestId("reject-button");
    fireEvent.click(rejectButton);
    let status = await screen.findByText("Rejected");
    expect(status).not.toBeNull();

    const undoButton = await screen.findByTestId("undo-button");
    fireEvent.click(undoButton);

    expect(() => screen.getByText("Rejected")).toThrow();
  });

  it("adds to sesssionStorage on accept", async () => {
    const mockCandidate = parseCandidate(mockCandidateData.results[0]);
    render(getWrapper(mockCandidate));
    const acceptButton = await screen.findByTestId("accept-button");
    fireEvent.click(acceptButton);

    const sessionValue = JSON.parse(
      sessionStorage.getItem("candidate_history_list") || ""
    );
    expect(sessionValue.length).toEqual(1);
  });

  it("adds to sesssionStorage on reject", async () => {
    const mockCandidate = parseCandidate(mockCandidateData.results[0]);
    render(getWrapper(mockCandidate));
    const rejectButton = await screen.findByTestId("reject-button");
    fireEvent.click(rejectButton);

    const sessionValue = JSON.parse(
      sessionStorage.getItem("candidate_history_list") || ""
    );
    expect(sessionValue.length).toEqual(1);
  });
});

export {};
