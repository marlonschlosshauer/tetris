(ns tetris.input)

;; TODO: Test for x,y
(defn position-validator
  [{:keys [x y]}]
  (and
   (>= x 0)
   (<= x 11)
   (>= y 0)
   (<= y 20)))

;; TODO: Move to core?
;; TODO: Add validator to pos atom
(defonce app-state-position
  (atom {:x 0 :y 0}))


(defn move [x y]
  (swap! app-state-position assoc :x x :y y))

;; TODO: fall-through with other bindings (keymap as param?)
(defn handle-inputs [e]
  (case (.-key e) 
    "k" (move 0 1)
    "j" (move 0 -1)
    "h" (move -1 0)
    "l" (move 1 0)
    :no-key))

(defn setup-inputs []
  (.addEventListener js/document "keypress" handle-inputs))


