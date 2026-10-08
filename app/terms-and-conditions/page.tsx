"use client";

import { motion } from "framer-motion";

const externalLinkClasses =
    "text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-primary";

export default function TermsAndConditions() {
    return (
        <div className="bg-secondary min-h-screen text-primary pb-20 pt-32">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-serif mb-8 text-center text-accent">
                        Terms &amp; Conditions
                    </h1>
                    <p className="text-sm opacity-60 text-center mb-12">
                        Last Updated: October 8, 2026
                    </p>

                    <div className="space-y-12 text-lg leading-relaxed opacity-90">
                        <section>
                            <h2 className="text-2xl font-serif mb-4 text-accent">1. Introduction</h2>
                            <p>
                                Welcome to Ajisai. These Terms &amp; Conditions apply to the reservations,
                                promotions, specials, rewards program and gift cards offered by Ajisai
                                Restaurant (&quot;Ajisai,&quot; &quot;we,&quot; &quot;us&quot; or &quot;our&quot;), located at 4050 SW 114th
                                Ave, Beaverton, OR 97005.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif mb-4 text-accent">2. Reservations</h2>
                            <div className="space-y-4">
                                <p>
                                    Online reservations are made through OpenTable. For parties of 7 or
                                    more, or for private Teppanyaki room inquiries, please contact us
                                    directly at (971) 727-3180.
                                </p>
                                <p>Hours of operation: daily from 11:00 AM to 10:00 PM.</p>
                                <p>
                                    <strong>Teppanyaki Policy:</strong> We recommend arriving 15 minutes
                                    prior to your reservation time. Teppanyaki shows start promptly.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif mb-6 text-accent">
                                3. Promotions and Specials
                            </h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-serif mb-3 text-accent">3.1 Lunch</h3>
                                    <p>Available Monday through Friday, 11:00 AM to 3:00 PM.</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-serif mb-3 text-accent">
                                        3.2 Daily Happy Hour
                                    </h3>
                                    <p className="mb-3">Available every day:</p>
                                    <ul className="list-disc pl-6 space-y-2 mb-4">
                                        <li>Bartop: 2:00 PM to 6:00 PM</li>
                                        <li>Lounge: 2:00 PM to 5:00 PM</li>
                                    </ul>
                                    <p>
                                        Happy Hour pricing applies to the items on the Happy Hour menu,
                                        which includes sushi rolls, nigiri, hot appetizers, salads, soup,
                                        draft beer, well cocktails and wine by the glass.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-serif mb-3 text-accent">
                                        3.3 Football Happy Hour
                                    </h3>
                                    <p className="mb-3">Available at the bartop during NFL games:</p>
                                    <ul className="list-disc pl-6 space-y-2 mb-4">
                                        <li>Sunday: 10:00 AM to 9:00 PM</li>
                                        <li>Monday: 5:00 PM to 8:00 PM</li>
                                        <li>Thursday: 5:00 PM to 8:00 PM</li>
                                    </ul>
                                    <p>
                                        Hours for special games vary. Football Happy Hour pricing applies
                                        to the items on the Football Happy Hour menu, which includes wings,
                                        lettuce wraps, crab rangoons and, during the game, $5 draft beer,
                                        $5 well cocktails and $5 wine.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-serif mb-3 text-accent">
                                        3.4 Monday Special: Kids Meals 50% Off
                                    </h3>
                                    <p>
                                        Available Mondays. Valid with the purchase of an adult entrée.
                                        Available for kids 12 and under.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-serif mb-3 text-accent">
                                        3.5 Tuesday Special
                                    </h3>
                                    <p>
                                        A special Tuesday treat for ladies. Enjoy 15% off all wine, beer
                                        and hot sake all day long.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif mb-6 text-accent">4. Ajisai Rewards</h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-serif mb-3 text-accent">
                                        4.1 Program Provider
                                    </h3>
                                    <p>
                                        Ajisai Rewards is operated through Toast. Enrollment is subject to
                                        Toast&apos;s Terms and Privacy Statement.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-serif mb-3 text-accent">4.2 Enrollment</h3>
                                    <div className="space-y-4">
                                        <p>
                                            Membership is free. You can sign up online at{" "}
                                            <a
                                                href="https://www.toasttab.com/ajisai-beaverton/rewardsSignup"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={externalLinkClasses}
                                            >
                                                toasttab.com/ajisai-beaverton/rewardsSignup
                                            </a>{" "}
                                            using your mobile phone number.
                                        </p>
                                        <p>
                                            By enrolling, you agree to participate in the rewards program
                                            and receive automated, personalized, informational and marketing
                                            text messages (if consented) at this number from this restaurant
                                            and restaurant group. Consent is not a condition of purchase.
                                            Message and data rates may apply, and frequency varies. Reply STOP
                                            to opt out.
                                        </p>
                                        <p>
                                            Receiving special offers through SMS is optional and can be
                                            selected at the time of enrollment.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-serif mb-3 text-accent">
                                        4.3 Earning and Redeeming Points
                                    </h3>
                                    <p>
                                        Members earn 1 point for every $1 spent and unlock $5 off for every
                                        100 points.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-serif mb-3 text-accent">
                                        4.4 Welcome Bonus
                                    </h3>
                                    <p>New members receive 200 welcome bonus points, a $10 value.</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-serif mb-3 text-accent">
                                        4.5 Checking Your Points
                                    </h3>
                                    <p>
                                        Members can check their current points balance at{" "}
                                        <a
                                            href="https://www.toasttab.com/ajisai-beaverton/rewardsLookup"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={externalLinkClasses}
                                        >
                                            toasttab.com/ajisai-beaverton/rewardsLookup
                                        </a>
                                        .
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif mb-4 text-accent">5. Gift Cards</h2>
                            <p className="mb-4">
                                Ajisai e-gift cards are sold through Toast at{" "}
                                <a
                                    href="https://order.toasttab.com/egiftcards/ajisai-beaverton"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={externalLinkClasses}
                                >
                                    order.toasttab.com/egiftcards/ajisai-beaverton
                                </a>
                                .
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>
                                    Amounts: $25, $50, $100 or $200, or a custom amount from $5.00 to
                                    $500.00.
                                </li>
                                <li>
                                    Delivery options: send the card via email, send the card via text, or
                                    send the card to yourself first.
                                </li>
                                <li>
                                    Delivery date: today (sent immediately after the order is completed)
                                    or a later date.
                                </li>
                                <li>
                                    Personalization: recipient&apos;s name, sender&apos;s name and a custom message
                                    of up to 255 characters.
                                </li>
                            </ul>
                            <p>
                                Gift card balances can be checked through the &quot;Check Balance&quot; link on the
                                gift card page.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif mb-4 text-accent">
                                6. Third-Party Services
                            </h2>
                            <p className="mb-6">
                                We use the following third-party services. When you use them, their own
                                terms and privacy policies apply.
                            </p>
                            <div className="overflow-x-auto rounded-lg border border-accent/20">
                                <table className="w-full min-w-[560px] border-collapse text-left">
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            <th className="px-5 py-4 font-serif text-lg font-normal">Service</th>
                                            <th className="px-5 py-4 font-serif text-lg font-normal">Used For</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-primary/15">
                                        <tr>
                                            <td className="px-5 py-4 font-medium">OpenTable</td>
                                            <td className="px-5 py-4">Table reservations</td>
                                        </tr>
                                        <tr>
                                            <td className="px-5 py-4 font-medium">Toast</td>
                                            <td className="px-5 py-4">
                                                Online pickup ordering, Ajisai Rewards, e-gift cards
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-5 py-4 font-medium">DoorDash</td>
                                            <td className="px-5 py-4">Delivery and pickup orders</td>
                                        </tr>
                                        <tr>
                                            <td className="px-5 py-4 font-medium">Grubhub</td>
                                            <td className="px-5 py-4">Delivery orders</td>
                                        </tr>
                                        <tr>
                                            <td className="px-5 py-4 font-medium">
                                                Instagram, Facebook and TikTok
                                            </td>
                                            <td className="px-5 py-4">Social media</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif mb-4 text-accent">7. Contact Us</h2>
                            <div className="bg-primary p-6 border border-accent/20 rounded-lg">
                                <p className="font-serif text-xl mb-2 text-white">Ajisai Restaurant</p>
                                <p>4050 SW 114th Ave</p>
                                <p>Beaverton, OR 97005</p>
                                <p className="mt-2 text-accent">(971) 727-3180</p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
