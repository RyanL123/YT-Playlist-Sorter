import React from "react";
import renderer from "react-test-renderer";
import Video from "./Video";

it("renders correctly", () => {
  const component = renderer.create(
    <Video
      metadata={{
        id: "123",
        statistics: {
          viewCount: "12345",
          likeCount: "12345",
        },
        snippet: {
          publishedAt: "1990-01-01",
          channelTitle: "Test",
          title: "Test",
          thumbnails: {
            medium: {
              url: "abc.com",
            },
          },
        },
        contentDetails: {
          duration: "PT1H1M1S",
        },
      }}
    />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
