import { isAdminAuthenticated } from "../../../src/server/admin-auth";
import { prisma } from "../../../src/server/db";
import {
  approveReview,
  deleteReview,
  loginAdmin,
  logoutAdmin,
  rejectReview,
} from "./actions";

export const dynamic = "force-dynamic";

type AdminReviewsPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

const statusLabels = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

export default async function AdminReviewsPage({ searchParams }: AdminReviewsPageProps) {
  const params = await searchParams;
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <form
          action={loginAdmin}
          className="w-full max-w-sm rounded-2xl border border-cyan-400/50 bg-gray-900/70 p-8 shadow-[0_0_35px_rgba(0,255,255,0.2)]"
        >
          <h1 className="text-2xl font-bold text-cyan-300 mb-2">Admin Reviews</h1>
          <p className="text-sm text-gray-400 mb-6">Enter the admin password to manage testimonials.</p>
          {params?.error ? (
            <p className="mb-4 rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              Invalid password.
            </p>
          ) : null}
          <input
            type="password"
            name="password"
            required
            className="w-full rounded-lg border border-cyan-400/30 bg-black/40 px-4 py-3 text-white outline-none focus:border-cyan-300"
            placeholder="Password"
          />
          <button className="mt-5 w-full rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 font-semibold text-black">
            Sign in
          </button>
        </form>
      </main>
    );
  }

  const reviews = await prisma.review.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    take: 100,
  });

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-cyan-300">Review Moderation</h1>
            <p className="text-gray-400">Approve, reject, or delete testimonial submissions.</p>
          </div>
          <form action={logoutAdmin}>
            <button className="rounded-full border border-cyan-400/50 px-5 py-2 text-sm text-cyan-100 hover:bg-cyan-400/10">
              Sign out
            </button>
          </form>
        </div>

        <div className="grid gap-5">
          {reviews.length === 0 ? (
            <div className="rounded-2xl border border-cyan-400/30 bg-gray-900/40 p-6 text-gray-300">
              No reviews submitted yet.
            </div>
          ) : (
            reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-2xl border border-cyan-400/30 bg-gray-900/50 p-6 shadow-[0_0_28px_rgba(0,255,255,0.12)]"
              >
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{review.name}</h2>
                    <p className="text-sm text-cyan-300">
                      {review.role} · {review.company}
                    </p>
                  </div>
                  <span className="rounded-full border border-cyan-400/30 px-3 py-1 text-xs uppercase tracking-wide text-cyan-100">
                    {statusLabels[review.status]}
                  </span>
                </div>
                <p className="mb-3 text-sm text-gray-400">Rating: {review.rating}/5</p>
                <p className="text-gray-200">{review.message}</p>
                <p className="mt-4 text-xs text-gray-500">
                  Submitted: {review.createdAt.toLocaleString("en-US")}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <form action={approveReview}>
                    <input type="hidden" name="id" value={review.id} />
                    <button className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-black">
                      Approve
                    </button>
                  </form>
                  <form action={rejectReview}>
                    <input type="hidden" name="id" value={review.id} />
                    <button className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-black">
                      Reject
                    </button>
                  </form>
                  <form action={deleteReview}>
                    <input type="hidden" name="id" value={review.id} />
                    <button className="rounded-lg border border-red-400/60 px-4 py-2 text-sm font-semibold text-red-200">
                      Delete
                    </button>
                  </form>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
