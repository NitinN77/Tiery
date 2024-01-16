export default async function Page({ params }: { params: { userId: string } }) {
  return <div>Your Profile {params.userId}</div>
}
