import type { Review } from "../types/review";

type ReviewSnippetProps = {
  review: Review;
};

export function ReviewSnippet({ review }: ReviewSnippetProps) {
  return (
    <article className="review-snippet">
      <strong>{review.rating}/5</strong>
      <p>{review.body}</p>
    </article>
  );
}
