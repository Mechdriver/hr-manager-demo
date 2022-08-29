import { ReactElement } from "react";
import { RecoilRoot } from "recoil";
import { render, fireEvent, screen } from "@testing-library/react";
import { mockCandidateData } from "../../mock_data";
import { parseCandidate } from "../../types/utils";
import CandidateCard from "../CandidateCard";
import { Candidate, CandidateStatus } from "../../types/CandidateType";

describe("Canddiate Card Component", () => {
  const fetchMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  function getWrapper(mockCandidate: Candidate): ReactElement {
    return (
      <RecoilRoot>
        <CandidateCard
          candidate={mockCandidate}
          fetchNewCandidate={fetchMock}
          isNewCandidate
        />
      </RecoilRoot>
    );
  }

  it("renders", async () => {
    const mockCandidate = parseCandidate(mockCandidateData.results[0]);
    render(getWrapper(mockCandidate));

    const card = await screen.findByTestId("candidate-card");
    expect(card).not.toBeNull();
  });

  it("fetches new candidate on new accept", async () => {
    const mockCandidate = parseCandidate(mockCandidateData.results[0]);
    render(getWrapper(mockCandidate));
    const acceptButton = await screen.findByTestId("accept-button");
    fireEvent.click(acceptButton);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("fetches new candidate on new reject", async () => {
    const mockCandidate = parseCandidate(mockCandidateData.results[0]);
    render(getWrapper(mockCandidate));
    const acceptButton = await screen.findByTestId("accept-button");
    fireEvent.click(acceptButton);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("can render a comment", async () => {
    let mockCandidate = parseCandidate(mockCandidateData.results[0]);
    mockCandidate = {
      ...mockCandidate,
      status: CandidateStatus.ACCEPTED,
      comment: "My test comment.",
    };
    render(getWrapper(mockCandidate));

    const commentArea = await screen.findByText("My test comment.");
    expect(commentArea).not.toBeNull();
  });
});

export {};
