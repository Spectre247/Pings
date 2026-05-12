/* Letter.jsx — italic closing letter, with one HiddenHeart in the copy */
function Letter() {
  return (
    <Section id="letter" narrow band eyebrow="a letter" title="<em>for you</em>" sub="not for the internet, but it's here, just in case.">
      <div className="letter">
        <span className="letter-eyebrow">written 11:42 pm · a tuesday</span>
        <div className="letter-body">
          <p>
            458 days, and i still text you good morning first<HiddenHeart id="h-letter1" />. it's the smallest habit i have, and the one i'm most proud of.
          </p>
          <p>
            people keep asking how we do it. i don't have a clever answer. we just keep <em>showing up</em>, on time zones that don't want to cooperate, with bad coffee and the same questions about each other's days. it isn't romantic on paper. it's romantic in the doing.
          </p>
          <p>
            in three weeks i'll see you in prague. i don't have anything planned for the first day. i just want to put my bag down and look at you in person. we can figure out pierogi after that<HiddenHeart id="h-letter2" />.
          </p>
          <p style={{color:"var(--blush-500)"}}>
            soon, soon, soon.
          </p>
        </div>
        <div className="letter-sign">
          <span>— for you · prague soon</span>
          <Ornament name="heart" size={16} color="var(--rose-300)" />
        </div>
      </div>
    </Section>
  );
}
window.Letter = Letter;
