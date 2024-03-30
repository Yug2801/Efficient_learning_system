
# Sample data
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

X = [
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [0, 1, 0, 1],
    [1, 0, 1, 0]
]

X_features = [sample[:] for sample in X]

y = ['Visual', 'Auditory', 'Visual', 'Auditory', 'Auditory', 'Visual', 'Visual', 'Auditory', 'Auditory', 'Visual']

X_train, X_test, y_train, y_test = train_test_split(X_features, y, test_size=0.2, random_state=42)

clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

joblib.dump(clf, 'learning_style_classifier.pkl')

y_pred = clf.predict(X_test)

joblib.dump((X_test, y_test),'test_set.pkl')